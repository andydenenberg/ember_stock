source 'http://rubygems.org'

gem 'rails', '3.2.12'
gem 'mysql2'
gem 'sqlite3'
gem 'strong_parameters'

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails'
  gem 'uglifier'
  gem 'anjlab-bootstrap-rails', '>= 2.1', :require => 'bootstrap-rails'
  gem 'therubyracer', :platforms => :ruby
end

gem 'active_model_serializers', github: 'rails-api/active_model_serializers'
gem 'jquery-rails'

# gem 'ember-rails', github: 'emberjs/ember-rails'
gem 'ember-rails'
gem 'ember-source', '1.0.0.rc5' # or the version you need
gem 'handlebars-source', '1.0.0.rc4' # or the version you need

group :test, :development do
  gem 'minitest'
  gem 'minitest-rails'
  gem 'minitest-rails-capybara'
  gem 'capybara'
  gem 'konacha'
  gem 'poltergeist'
end

group :test do
  # Pretty printed test output
  gem 'turn', '~> 0.8.3'
end
