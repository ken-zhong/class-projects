def quick_sort(array)
  arr = array.dup
  return [] if arr.empty?
  pivot = arr.delete_at(rand(0...arr.length))
  partit = arr.partition { |el| el < pivot }
  return quick_sort(partit[0]) + [pivot] + quick_sort(partit[1])
end

def merge_sort(array)
  return array if array.length < 2
  mid = array.length/2
  left, right = merge_sort(array[0...mid]), merge_sort(array[mid..-1])
  merge(left, right)
end

def merge(left, right)
  result = []
  until left.empty? || right.empty?
    if left[0] < right[0]
      result << left.shift
    else
      result << right.shift
    end
  end
  result + left + right
end

def bubble_sort(array)
  sorted = false
  arr = array.dup
  until sorted
    sorted = true
    for i in (0...arr.length-1) do
      if arr[i] > arr[i+1]
        arr[i], arr[i+1] = arr[i+1], arr[i]
        sorted = false
      end
    end
  end
  arr
end

def insertion_sort(array)
  arr = array.dup
  result = [arr.shift]
  until arr.empty?
    el = arr.shift
    idx = result.length - 1
    while el < result[idx]
      idx -= 1
      break if idx < 0
    end
    result.insert(idx+1, el)
  end
  result
end

a = [7,2,5,8,1,11,45,-32]
puts "testing: #{a}"
puts "bubble sort = #{bubble_sort(a)}"
puts "merge sort = #{merge_sort(a)}"
puts "insertion sort = #{insertion_sort(a)}"
puts "merge sort = #{merge_sort(a)}"
