<!-- BEGIN_AUTOGENERATED -->
# AndAsgn Node Formatting

Represents `a &&= 1` statement.
<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
bool &&= false
```

After:

```ruby
bool &&= false
```

## Breaks a line when necessary

Before:

```ruby
bool &&= "some really long value that shouldn't be here" && "something also really long"
```

After:

```ruby
bool &&=
  "some really long value that shouldn't be here" &&
    "something also really long"
```
