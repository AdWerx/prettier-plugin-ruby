<!-- BEGIN_AUTOGENERATED -->

# EFlipFlop Node Formatting

Represents exclusive flip-flop (i.e. in `if foo...bar; end`)

<!-- END_AUTOGENERATED -->

## Fails because no tests are written

Before:

```ruby
if foo...bar
  nil
end
```

After:

```ruby
if foo...bar
  nil
end
```
