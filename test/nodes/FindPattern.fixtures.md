<!-- BEGIN_AUTOGENERATED -->

# FindPattern Node Formatting

Represents a find pattern using in pattern matching (i.e. `in [*x, 1 => a, *y]`)

It's different from `ArrayPattern`/`ConstPattern` because it supports multiple wildcard pattern

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
case [1, {}, 2]
in [*x, 1 => a, *y]
end
```

After:

```ruby
case [1, {}, 2]
in [*x, 1 => a, *y]
end
```
