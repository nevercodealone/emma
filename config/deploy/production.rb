set :stage, :production
set :rails_env, :production

# There is duplication here with sync.rake!

server = 'emma.9elements.com'

role :app, server, user: 'emma'
role :web, server, user: 'emma'
role :db,  server, user: 'emma'

set :deploy_to, '/home/emma/production'

def current_branch
  ref = `git symbolic-ref HEAD`.chomp
  pre_ref = 'refs/heads/'
  raise 'Unable to determine current branch' unless ref.start_with?(pre_ref)
  branch = ref[pre_ref.length..-1]
  puts "About to deploy branch #{branch}"
  branch
end

set :branch, ENV['BRANCH'] || current_branch
