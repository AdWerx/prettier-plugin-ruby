<!-- BEGIN_AUTOGENERATED -->
# Index Node Formatting

Represents indexing operation (i.e. `foo[1,2,3]`)
<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
foo[ 1, 2 ]
```

After:

```ruby
foo[1, 2]
```

## Breaks the index brackets when necessary

Before:

```ruby
foo[some_variable_name_that_is_used_as_an_index_in_this_example, another_long_name ]
```

After:

```ruby
foo[
  some_variable_name_that_is_used_as_an_index_in_this_example,
  another_long_name
]
```
