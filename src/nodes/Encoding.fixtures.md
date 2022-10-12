# Encoding Formatting

## Works

Before:

```ruby
__ENCODING__
```

After:

```ruby
__ENCODING__
```

## Formats as an arg

Before:

```ruby
def encode(encoding = __ENCODING__)
```

After:

```ruby
def encode(encoding = __ENCODING__)
```
