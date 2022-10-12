# Rescue Formatting

## Formats and empty begin/rescue

Before:

```ruby
begin
rescue
end
```

After:

```ruby
begin

rescue
end
```

## Formats with statements in the body of the rescue and begin

Before:

```ruby
begin
  "foo"
rescue
  "bar"
end
```

After:

```ruby
begin
  "foo"
rescue
  "bar"
end
```

## Formats without exception pattern and with an exception variable assignment

Before:

```ruby
begin
  fail
rescue => e
end
```

After:

```ruby
begin
  fail
rescue => e
end
```

## Formats with exception pattern and an exception variable assignment

Before:

```ruby
begin
  fail
rescue StandardError => e
end
```

After:

```ruby
begin
  fail
rescue StandardError => e
end
```

## Formats with an exception list pattern and an exception variable assignment

Before:

```ruby
begin
  fail
rescue StandardError, SyntaxError => e
end
```

After:

```ruby
begin
  fail
rescue StandardError, SyntaxError => e
end
```

## Formats with an exception pattern and an exception variable assignment

Before:

```ruby
begin
  fail
rescue SyntaxError
end
```

After:

```ruby
begin
  fail
rescue SyntaxError
end
```

## Formats with an exception list pattern without exception variable assignment

Before:

```ruby
begin
  fail
rescue StandardError, SyntaxError
end
```

After:

```ruby
begin
  fail
rescue StandardError, SyntaxError
end
```
