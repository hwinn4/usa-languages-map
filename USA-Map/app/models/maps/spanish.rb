class Maps::Spanish < ActiveRecord::Base
  def index
    @spanish = Spanish.new
    redirect_to [:maps, @spanish]
  end
end
