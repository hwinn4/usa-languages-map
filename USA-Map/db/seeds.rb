# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# require_relative '../app/models/adapters/data_parser.rb'

Adapters::DataParser.parse.each do |state_hash|

  new_state = State.find_or_create_by(name: state_hash["state"])
  new_state.language1 = state_hash["language1"]
  new_state.speakers1 = state_hash["speakers1"]
  new_state.language2 = state_hash["language2"]
  new_state.speakers2 = state_hash["speakers2"]
  new_state.save
end
