# Ivasgn Formatting

## Formats

Before:

```ruby
@name = "toby"
```

After:

```ruby
@name = "toby"
```

## Formats with operator assignment

Before:

```ruby
@name += "toby"
```

After:

```ruby
@name += "toby"
```

## Formats with or assignment

Before:

```ruby
@name ||= "cached"
```

After:

```ruby
@name ||= "cached"
```

## Formats with or assignment with begin

Before:

```ruby
@name ||= begin
  "cached"
end
```

After:

```ruby
@name ||=
  begin
    "cached"
  end
```
