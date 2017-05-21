class Backend::BackendController < ApplicationController
  layout 'backend'

  http_basic_authenticate_with name: "tafel", password: "essen schmeckt gut"
end
