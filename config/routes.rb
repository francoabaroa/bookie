Rails.application.routes.draw do
    root :to => "application#fallback_index_html"

    namespace :api do
      namespace :v1 do
        resources :books
      end
    end

    get ":default" => "application#fallback_index_html"
end


