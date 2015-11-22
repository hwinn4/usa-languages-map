class StatesController < ApplicationController
  def show
    @state = State.find_by name: params[:name]

    respond_to do |format|
      format.json { render json: @state.to_json }
    end
  end
end
