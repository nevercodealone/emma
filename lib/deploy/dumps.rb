namespace :dump do
  task :down do
    Rake::Task["dump:create"].invoke
    Rake::Task["dump:fetch"].invoke
    Rake::Task["dump:clean"].invoke
  end

  task :up do
    Rake::Task["dump:push"].invoke
    Rake::Task["dump:restore"].invoke
    Rake::Task["dump:clean"].invoke
  end

  task :create do
    on roles(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          rake 'db:dump'
        end
      end
    end
  end

  task :fetch do
    on roles(:db) do
      within release_path do
        dump_filename = 'emma.dump.tar' # @TODO remove duplication
        download! release_path.join(dump_filename), dump_filename
      end
    end
  end

  task :push do
    on roles(:db) do
      within release_path do
        dump_filename = 'emma.dump.tar' # @TODO remove duplication
        upload! dump_filename, release_path.join(dump_filename)
      end
    end
  end

  task :restore do
    on roles(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          rake 'db:restore'
        end
      end
    end
  end

  task :clean do
    on roles(:db) do
      within release_path do
        with rails_env: fetch(:rails_env) do
          rake 'db:clean_dump'
        end
      end
    end
  end
end
