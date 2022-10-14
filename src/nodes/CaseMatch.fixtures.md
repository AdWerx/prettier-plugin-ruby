# CaseMatch Formatting

## Formats

Before:

```ruby
case foo
in [1, 2] then true
in *foo then nil
else
  "bar"
end
```

After:

```ruby
case foo
in [1, 2] then true
in *foo then nil
else "bar"
end
```
