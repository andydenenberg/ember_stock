class StocksController < ApplicationController
  # GET /stocks.json
  def index
    render json: Stock.all
  end

  # GET /stocks/1.json
  def show
    stock = Stock.find(params[:id])
    render json: stock
  end

  # POST /stocks.json
  def create
    stock = Stock.new
    if update_stock(stock)
      render json: stock, status: :created
    else
      render json: stock.errors, status: :unprocessable_entity
    end
  end

  # PUT /stocks/1.json
  def update
    stock = Stock.find(params[:id])
    if update_stock(stock)
      render json: stock, status: :ok
    else
      render json: stock.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stocks/1.json
  def destroy
    stock = Stock.find(params[:id])
    stock.destroy
    render json: nil, status: :ok
  end

private

  def permitted_params
    params.require(:stock).permit(:symbol,
                                    :quantity, :purchase_price, :last_price, :id )
  end

  def update_stock(stock)

    # Because updates to the stock and its associations should be atomic,
    # wrap them in a transaction.
    Stock.transaction do
      # Update the stock's own attributes first.
      stock.attributes = permitted_params
      stock.save!
    end

    # Important! Reload the stock to ensure that changes to its associations
    # (i.e. phone numbers) will be serialized correctly.
    stock.reload

    return true
  rescue
    return false
  end
end
