class Book < ApplicationRecord
    validates :isbn, presence: true, :uniqueness => true
    validates :title, presence: true
end
