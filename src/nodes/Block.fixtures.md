# Block Formatting

## Formats

Before:

```ruby
foo {}
```

After:

```ruby
foo {}
```

## Consolidates a block to oneline

Before:

```ruby
->() {

}
```

After:

```ruby
-> {}
```

## Breaks up statements

Before:

```ruby
->() {
  break 1
  next 2
}
```

After:

```ruby
-> do
  break 1
  next 2
end
```
