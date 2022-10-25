# ConstPattern Formatting

Const pattern used in pattern matching (e.g. `in A(1, 2)`)

## Formats

Before:

```ruby
case foo
in SQUARE(1, 2) then nil
end
```

After:

```ruby
case foo
in SQUARE(1, 2) then nil
end
```
