<!-- BEGIN_AUTOGENERATED -->

# EmptyElse Node Formatting

Represents a special empty else that is a part of the pattern matching.

Usually empty else (e.g. part of the `if` statement) doesn't mean anything,
however in pattern matching it prevents raising a `NoPatternError`.

Throwing away this `else` may affect your code.

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
case 1
in 2
  nil
else
end
```

After:

```ruby
case 1
in 2 then nil
else
end
```