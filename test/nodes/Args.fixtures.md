<!-- BEGIN_AUTOGENERATED -->

# Args Node Formatting

Represents an arguments list

`Args(vec![Arg("a"), Optarg("b", Int("1"))])` in `def m(a, b = 1); end`

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
def sum(one, two = "1", three = nil, four, foo:, **kwrest)
  nil
end
```

After:

```ruby
def sum(one, two = "1", three = nil, four, foo:, **kwrest)
  nil
end
```