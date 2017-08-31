require_relative "deck"
# require 'byebug'

# RULES: players start with a hand of 7 and try to discard by matching the
# revealed card's number or suit. 8s are wild, and can be placed anytime.
# After an 8 is placed, the next player must match the suit of the 8.

class Game
  attr_accessor :deck, :player1, :player2, :discard_pile
  def initialize(p1, p2)
    @deck = Deck.new
    @discard_pile = []
    @player1 = p1
    @player2 = p2
  end

  def play
    deck.shuffle
    player1.hand = deck.deal_cards(7)
    player2.hand = deck.deal_cards(7)
    discard_pile << deck.deal_one
    player1.get_deck(deck)
    player2.get_deck(deck)

    # the play loop
    until over?
      display_top
      play_turn(player1)
      break if over?
      play_turn(player2)
    end
    winner = get_winner
    puts "Game over! The winner is: #{winner.name}"
  end

  def over?
    return false unless deck.empty?
    if player1.hand.empty? || player2.hand.empty?
      return true
    elsif player1.possible_play?(revealed_card) || player2.possible_play?(revealed_card)
      return false
    else
      return true
    end
  end

  def play_turn(player)
    # should either get a card to discard, a request to draw
    player.display_hand if player.instance_of? Player
    play = player.get_play(revealed_card)
    case play
    when :draw
      player.hand << deck.deal_one
      play_turn(player)
    when :pass
      #pass do nothing
    when Card
      player.hand.delete(play)
      discard_pile << play
    else
      raise "error this shouldn't get hit"
    end
  end

  def get_winner
    return player1 if player1.hand.empty?
    return player2 if player2.hand.empty?

    p1_points = get_points(player1.hand)
    p2_points = get_points(player2.hand)

    p1_points > p2_points ? player1 : player2
  end

  def get_points(hand)
    hand.reduce(0) do |sum, card|
      if card.val == 8
        sum + 50
      elsif card.val <= 13 && card.val >= 11
        sum + 10
      else
        sum + card.val
      end
    end
  end

  def revealed_card
    @discard_pile.last
  end

  def display_top
    sleep 0.2
    puts "***************************************"
    puts "The top card is: #{revealed_card.name}"
    puts "***************************************"
    sleep 0.2
    puts "Your opponent has #{player2.hand.count} cards in hand."
    puts "There is #{deck.deck.length} cards remaining in the deck."
  end

end

class Player
  attr_accessor :hand, :name
  def initialize(name="Bob")
    @name = name
    @hand = []
  end

  def get_deck(deck)
    @deck = deck
  end

  def get_play(revealed_card)
    #should return a card, or a request to draw a card, or pass
    if @deck.empty?
      puts "The deck is empty now! (D)raw a card, choose (#) a card to to discard, or (P)ass:"
    else
      puts "(D)raw a card, or choose (#) a card to to discard:"
    end
    input = gets.chomp.downcase
    if input == "d"
      return :draw
    elsif input == "p" && @deck.empty?
      return :pass
    else
      idx = input.to_i - 1
      if (0..hand.length).include?(idx)
        return hand[idx] if valid_play?(hand[idx], revealed_card)
        puts "Invalid move. Please try again!"
        get_play(revealed_card)
      else
        puts "Invalid move. Please try again!"
        get_play(revealed_card)
      end
    end

  end


  def valid_play?(card, revealed_card)
    return true if card.val == 8
    card.suit == revealed_card.suit || card.val == revealed_card.val
  end

  def possible_play?(revealed_card)
    if hand.any? { |card| card.val == 8}
      return true
    else
      return hand.any? { |card| card.suit == revealed_card.suit } || hand.any? { |card| card.val == revealed_card.val }
    end
  end

  def display_hand
    display = "Your hand: "
    hand.each_with_index { |card, idx| display << "#{idx+1}) #{card.name} " }
    puts display
  end
end

class PlayerAI

  attr_accessor :hand, :name
  def initialize(name="I am Robot")
    @name = name
    @hand = []
  end

  def get_deck(deck)
    @deck = deck
  end

  def get_play(revealed_card)
    #should return a card, or a request to draw a card, or pass
    valid_plays = hand.select { |card| valid_play?(card, revealed_card) }

    if @deck.empty?
      return valid_plays.sample unless valid_plays.empty?
      return :pass
    else
      if hand.empty? || valid_plays.empty?
        return :draw
      else
        return valid_plays.sample
      end
    end
  end

  def valid_play?(card, revealed_card)
    return true if card.val == 8
    card.suit == revealed_card.suit || card.val == revealed_card.val
  end

  def possible_play?(revealed_card)
    if hand.any? { |card| card.val == 8}
      return true
    else
      return hand.any? { |card| card.suit == revealed_card.suit } || hand.any? { |card| card.val == revealed_card.val }
    end
  end

  def display_hand
    display = "#{name}'s hand: "
    hand.each_with_index { |card, idx| display << " #{idx+1}) #{card.name} " }
    puts display
  end
end

# game = Game.new(Player.new("Hu-mon"), PlayerAI.new("Do I have a soul?"))
# game.play
ai_game = Game.new(PlayerAI.new("Robot_1"), PlayerAI.new("Robot_2"))
ai_game.play
