class Book < ApplicationRecord
    validates :isbn, presence: true
    validates :title, presence: true
end
