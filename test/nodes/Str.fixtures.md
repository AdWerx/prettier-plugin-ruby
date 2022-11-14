<!-- BEGIN_AUTOGENERATED -->
# Str Node Formatting

Represents a plain non-interpolated string literal (e.g. `"foo"`)
<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
"this is a string" \
  " spanning multiple lines"
```

After:

```ruby
"this is a string spanning multiple lines"
```

## Formats methods called on it

Before:

```ruby
"this is a string" .chomp
```

After:

```ruby
"this is a string".chomp
```