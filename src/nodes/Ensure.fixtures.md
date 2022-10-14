# Ensure Formatting

## Formats

Before:

```ruby
def foo
  f = File.open
ensure
  f.close
end
```

After:

```ruby
def foo
  f = File.open
ensure
  f.close
end
```

## Formats recursively

Before:

```ruby
def foo
  f = File.open
ensure
  begin
    f.close
  ensure
    f.unlock
  end
end
```

After:

```ruby
def foo
  f = File.open
ensure
  begin
    f.close
  ensure
    f.unlock
  end
end
```

## Formats closing a loop block

Before:

```ruby
[].each do |i|
  i += 1
ensure
  ack
end
```

After:

```ruby
[].each do |i|
  i += 1
ensure
  ack
end
```
