# Alias Formatting

## Works

Before:

```ruby
alias call_without_options call
alias call call_with_options
```

After:

```ruby
alias call_without_options call
alias call call_with_options
```

## Can break a line

Before:

```ruby
alias some_really_long_method_name_that_will_break original_method_thats_also_really_l
```

After:

```ruby
alias
  some_really_long_method_name_that_will_break
  original_method_thats_also_really_l
```
