def quick_sort(array)
  arr = array.dup
  return [] if arr.empty?
  pivot = arr.delete_at(rand(0...arr.length))
  partit = arr.partition { |el| el < pivot }
  return quick_sort(partit[0]) + [pivot] + quick_sort(partit[1])
end

def merge_sort(array)
  arr = array.dup
  idx = arr/
  left

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

a = [7,2,5,8,1,11,45,-32]
puts "testing: #{a}"
puts "bubble sort = #{bubble_sort(a)}"
puts "merge sort = #{merge_sort(a)}"
puts "insertion sort = #{insertion_sort(a)}"
puts "merge sort = #{merge_sort(a)}"
