class DatabaseTasks
  def dump!
    spawn(*%w{pg_dump --format=tar --clean --no-owner --no-privileges}, database_name, out: dump_filename.to_s)
  end

  def clean_dump!
    dump_filename.unlink rescue Errno::ENOENT # always raises, dunno why.
  end

  def restore!
    if Rails.env.production?
      raise "Please remove this blocking code manually to restore database in production."
    end

    connection = ActiveRecord::Base.connection
    connection.tables.each do |table_name|
      connection.drop_table table_name
    end
    spawn(*%w{pg_restore --no-owner -n public -d}, database_name, in: dump_filename.to_s)
  end

  def dump_filename
    Rails.root.join "emma.dump.tar"
  end

  def database_name
    Category.connection.current_database
  end

  private

  def spawn(*args)
    pid = Kernel.spawn(*args)
    Process.wait(pid)
    raise RuntimeError, $?.to_s unless $?.success?
  end
end

namespace :db do
  desc "Dump the database of the current environment"
  task dump: :environment do
    DatabaseTasks.new.dump!
  end

  desc "Remove the database dump file"
  task clean_dump: :environment do
    DatabaseTasks.new.clean_dump!
  end

  desc "Restore database from dump"
  task restore: :environment do
    DatabaseTasks.new.restore!
  end

  desc "Create backdoor user"
  task create_backdoor_users: :environment do
    DatabaseTasks.new.create_backdoor_users!
  end
end
