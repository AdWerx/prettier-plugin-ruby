<!-- BEGIN_AUTOGENERATED -->

# OrAsgn Node Formatting

Represents `lhs ||= rhs` assignment

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
done ||= true
```

After:

```ruby
done ||= true
```

## Formats with right hand expression

Before:

```ruby
done ||= (true && "foo")
```

After:

```ruby
done ||= (true && "foo")
```

## Formats with a left-hand expression

Before:

```ruby
ad_config[code] ||= {}
```

After:

```ruby
ad_config[code] ||= {}
```
