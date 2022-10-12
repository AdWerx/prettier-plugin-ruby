# And Formatting

## Works

Before:

```ruby
true && false
```

After:

```ruby
true && false
```

## Retains explicit parentheses

Before:

```ruby
(true && false)
```

After:

```ruby
(true && false)
```

## Retains meaningful parentheses

Before:

```ruby
(nil || "default") && true
```

After:

```ruby
(nil || "default") && true
```

## Breaks when necessary

Before:

```ruby
"something_i_was_hoping_is_true" && "something_else_i_was_hoping_is_true" && "the_last_part" && "the_last_part_cont"
```

After:

```ruby
"something_i_was_hoping_is_true" && "something_else_i_was_hoping_is_true" &&
  "the_last_part" &&
  "the_last_part_cont"
```
