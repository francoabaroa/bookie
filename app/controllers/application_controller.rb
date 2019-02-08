class ApplicationController < ActionController::Base
  def fallback_index_html
     respond_to do |format|
       format.html { render body: Rails.root.join('client/public/index.html').read }
     end
    end
end