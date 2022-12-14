<!-- BEGIN_AUTOGENERATED -->

# Yield Node Formatting

Represents an `yield` keyword

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
yield 1
```

After:

```ruby
yield 1
```

## Preserves parens wrapping the arg

Before:

```ruby
foo { yield(42) }
```

After:

```ruby
foo { yield(42) }
```

## Formats with a guard

Before:

```ruby
yield unless right_of_way
```

After:

```ruby
yield unless right_of_way
```

## Formats in a ternary

Before:

```ruby
row ? yield : next
```

After:

```ruby
row ? yield : next
```

## Retains parens when the arg is a splat

Before:

```ruby
def pluck(*attrs)
  incoming.map do |payload|
    values = payload.values_at(*attrs)
    yield(*values) if block_given?
    attrs.size > 1 ? values : values.first
  end
end
```

After:

```ruby
def pluck(*attrs)
  incoming.map do |payload|
    values = payload.values_at(*attrs)
    yield(*values) if block_given?
    attrs.size > 1 ? values : values.first
  end
end
```
