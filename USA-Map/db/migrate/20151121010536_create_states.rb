class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string   "name"
      t.integer  "num"
      t.datetime "created_at", null: false
      t.datetime "updated_at", null: false
      t.string "language1"
      t.integer "speakers1"
      t.string "language2"
      t.integer "speakers2"
      t.timestamps null: false
    end
  end
end
