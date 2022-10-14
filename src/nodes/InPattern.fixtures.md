# InPattern Formatting

## Formats

Before:

```ruby
case foo
in [1, [2], 3,] then true
in Foo then true
in Foo[1, 2, 3] then true
in { foo: bar } then true
in ^foo then true
in foo => bar then true
in [*, foo, *] then nil
in foo if bar then nil
in foo unless bar then nil
in foo | bar then nil
in **nil then nil
in *foo then nil
else nil
end
```

After:

```ruby
case foo
in [1, [2], 3,] then true
in Foo then true
in Foo[1, 2, 3] then true
in { foo: bar } then true
in ^foo then true
in foo => bar then true
in [*, foo, *] then nil
in foo if bar then nil
in foo unless bar then nil
in foo | bar then nil
in **nil then nil
in *foo then nil
else nil
end
```
