# Defined Formatting

## Formats

Before:

```ruby
defined?( SOME_CONST )
```

After:

```ruby
defined?(SOME_CONST)
```

## Breaks when necessary

Before:

```ruby
defined?(SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONSTNAME)
```

After:

```ruby
defined?(
  SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONST::SOME_CONSTNAME
)
```
