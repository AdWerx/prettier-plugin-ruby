# Case Formatting

## Breaks a line for every `when` and `else`

Before:

```ruby
case foo
  when bar then nil
  else
    nil
  end
```

After:

```ruby
case foo
when bar then nil
else nil
end
```

## Breaks a when's body when necessary

Before:

```ruby
case foo
  when bar then if true then "some string that I like" end
  else
    nil
  end
```

After:

```ruby
case foo
when bar
  if true
    "some string that I like"
  end
else nil
end
```

## Nests properly

Before:

```ruby
case foo
  when bar then "foo"
  else
    case nested
      when "why"
        :unknown
      else
        false
      end
  end
```

After:

```ruby
case foo
when bar then "foo"
else
  case nested
  when "why" then :unknown
  else false
  end
end
```
