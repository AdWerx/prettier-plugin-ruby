# Xstr Formatting

## Formats

Before:

```ruby
`date`
```

After:

```ruby
`date`
```

## Formats with %x wrapping

Before:

```ruby
%x{arch}
```

After:

```ruby
%x{arch}
```

## Formats with interpolation

Before:

```ruby
%x{git rev-parse #{head}}
```

After:

```ruby
%x{git rev-parse #{head}}
```
