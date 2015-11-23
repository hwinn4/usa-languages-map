class CreateMapsSpanishes < ActiveRecord::Migration
  def change
    create_table :maps_spanishes do |t|

      t.timestamps null: false
    end
  end
end
