class Deck
  attr_accessor :deck, :drawn_cards

  @@SUITS = ["clubs", "diamonds", "hearts", "spades"]
  @@VALUES = (1..13).to_a

  def initialize
    @deck = []
    @drawn_cards = []
    populate_deck
  end

  # !!!! DON'T USE THE POP METHOD ON @deck IN GAMES! USE DEAL_ONE or DEAL_CARDS
  def deal_cards(num)
    # returns an array of cards, unless
    raise "error" if num < 1
    return deal_one if num == 1
    new_cards = []
    num.times do
      new_card = @deck.pop
      new_cards << new_card
      @drawn_cards << new_card
    end
    new_cards
  end

  def deal_one
    # returns a single card object
    new_card = @deck.pop
    @drawn_cards << new_card
    new_card
  end

  def shuffle
    @deck = @deck.shuffle
  end

  def populate_deck
    @@SUITS.each do |suit|
      @@VALUES.each { |val| @deck << Card.new(suit, val) }
    end
  end

  def empty?
    deck.empty?
  end

  def reset_deck
    deck = deck.concatonate
  end

end



class Card
  attr_reader :name, :val, :suit

  @@STRING_DIC = {
    1 => "Ace",
    11 => "Jack",
    12 => "Queen",
    13 => "King"
  }

  def initialize(suit, val)
    @suit = suit
    @val = val
    @name = get_name
  end

  def get_name
    if @val == 1 || @val > 10
      @name = "#{@@STRING_DIC[val]} of #{@suit}"
    else
      @name = "#{@val} of #{@suit}"
    end
  end
end
