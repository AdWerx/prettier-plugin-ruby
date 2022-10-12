# IfMod Formatting

## Formats

Before:

```ruby
foo if bar
```

After:

```ruby
foo if bar
```

## Formats

Before:

```ruby
foo unless bar
```

After:

```ruby
foo unless bar
```

## Breaks if when necessary

Before:

```ruby
foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofo if barfoofoofoo
```

After:

```ruby
if barfoofoofoo
  foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofo
end
```

## Breaks unless when necessary

Before:

```ruby
foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofo unless barfoofoofoo
```

After:

```ruby
unless barfoofoofoo
  foofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofoofo
end
```
