-- PostgreSQL schema proposal for Project Performance Daily

create table app_user (
  id uuid primary key,
  email text not null unique,
  full_name text not null,
  role text not null check (role in ('COLLABORATOR','MANAGER','ADMIN')),
  password_hash text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table stage_template (
  id uuid primary key,
  name text not null,
  is_default boolean not null default false,
  created_by uuid references app_user(id),
  created_at timestamptz not null default now()
);

create table stage_template_item (
  id uuid primary key,
  template_id uuid not null references stage_template(id) on delete cascade,
  position int not null,
  stage_name text not null,
  weight_percent numeric(5,2) not null check (weight_percent > 0),
  unique(template_id, position)
);

create table project (
  id uuid primary key,
  name text not null,
  area text not null,
  owner_id uuid not null references app_user(id),
  created_by uuid not null references app_user(id),
  start_date date not null,
  deadline_date date not null,
  template_id uuid references stage_template(id),
  status text not null default 'OPEN' check (status in ('OPEN','DONE','CANCELLED')),
  created_at timestamptz not null default now(),
  check (deadline_date >= start_date)
);

create table project_stage (
  id uuid primary key,
  project_id uuid not null references project(id) on delete cascade,
  position int not null,
  stage_name text not null,
  weight_percent numeric(5,2) not null check (weight_percent > 0),
  completed_at timestamptz,
  completed_by uuid references app_user(id),
  completion_note text,
  unique(project_id, position)
);

create table project_stage_evidence (
  id uuid primary key,
  project_stage_id uuid not null references project_stage(id) on delete cascade,
  original_file_name text not null,
  mime_type text,
  size_bytes bigint not null,
  storage_path text not null,
  uploaded_by uuid not null references app_user(id),
  uploaded_at timestamptz not null default now()
);

create index idx_project_owner on project(owner_id);
create index idx_project_deadline on project(deadline_date);
create index idx_project_stage_project on project_stage(project_id);

-- Suggested view for manager dashboard
create view vw_project_progress as
select
  p.id as project_id,
  p.name as project_name,
  p.area,
  p.owner_id,
  p.start_date,
  p.deadline_date,
  coalesce(sum(case when ps.completed_at is not null then ps.weight_percent else 0 end),0) as real_percent,
  case
    when p.deadline_date = p.start_date then 100
    else greatest(0, least(100,
      (extract(day from (current_date - p.start_date))::numeric /
      nullif(extract(day from (p.deadline_date - p.start_date))::numeric, 0)) * 100
    ))
  end as expected_percent
from project p
join project_stage ps on ps.project_id = p.id
group by p.id;
