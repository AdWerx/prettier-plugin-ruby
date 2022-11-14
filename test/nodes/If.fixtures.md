<!-- BEGIN_AUTOGENERATED -->

# If Node Formatting

Represents an `if` statement (i.e. `if foo; bar; else; baz; end`)

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
if true
  "foo"
end
```

After:

```ruby
if true
  "foo"
end
```

## Removes `then`

Before:

```ruby
if true
end
```

After:

```ruby
if true
end
```

## Prints the if true body

Before:

```ruby
if true
  "foo"
end
```

After:

```ruby
if true
  "foo"
end
```

## Prints the if false body

Before:

```ruby
if true
  "foo"
else
  "false"
end
```

After:

```ruby
if true
  "foo"
else
  "false"
end
```

## Prints the if false body

Before:

```ruby
if true
  "foo"
elsif false
  "false"
else
  "?"
end
```

After:

```ruby
if true
  "foo"
elsif false
  "false"
else
  "?"
end
```

## Adds a `then` when the condition spans multiple lines

Before:

```ruby
if "really_long_condition_that_cannot_be_broken" &&
  "another_long_condition_that_exceeds_normal"
then
  true
else
  "?"
end
```

After:

```ruby
if "really_long_condition_that_cannot_be_broken" &&
  "another_long_condition_that_exceeds_normal"
then
  true
else
  "?"
end
```

## Adds a `then` when the condition spans multiple lines

Before:

```ruby
if true
  true
elsif "really_long_condition_that_cannot_be_broken" &&
  "another_long_condition_that_exceeds_normal"
then
  "?"
end
```

After:

```ruby
if true
  true
elsif "really_long_condition_that_cannot_be_broken" &&
  "another_long_condition_that_exceeds_normal"
then
  "?"
end
```

## Nests

Before:

```ruby
if true
  if false
    if true
    elsif true
      if "long codition long condition long condition" &&
        "long condition long condition"
      then
        "ok"
      end
    end
  end
end
```

After:

```ruby
if true
  if false
    if true
    elsif true
      if "long codition long condition long condition" &&
        "long condition long condition"
      then
        "ok"
      end
    end
  end
end
```

## Formats in an assignment

Before:

```ruby
foo = if true
  "true"
else
  "false"
end
```

After:

```ruby
foo = if true
  "true"
else
  "false"
end
```