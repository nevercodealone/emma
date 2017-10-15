require_relative '../lib/deploy/dumps'

set :default_env, {
  'PATH' => '/opt/ruby-2.2.2/bin:PATH=$PATH'
}

set :application, 'emma'
set :repo_url, 'git@github.com:nevercodealone/emma.git'

set :ssh_options, { forward_agent: true }

set :linked_dirs, %w{public/uploads}

namespace :deploy do
  desc "restart application"

  task :restart do
    on primary fetch(:migration_role) do
       within release_path do
         with rails_env: fetch(:rails_env) do
           execute :touch, release_path.join('tmp', 'restart.txt')
         end
       end
    end
  end

  after :finishing, 'deploy:restart'
  after :finishing, 'deploy:cleanup'
  # after :finishing, 'deploy:bundle_for_backup'

  desc "Seed the database"
  task :seed => [:set_rails_env] do
    on primary fetch(:migration_role) do
       within release_path do
         with rails_env: fetch(:rails_env) do
           execute :rake, "db:seed"
         end
       end
    end
  end
end
