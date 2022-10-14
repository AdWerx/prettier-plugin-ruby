<!-- BEGIN_AUTOGENERATED -->
# Cvasgn Node Formatting

Represents class variable assignment (i.e. `@@var = 42`)
<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
@@name = "toby"
```

After:

```ruby
@@name = "toby"
```

## Formats with operator assignment

Before:

```ruby
@@name += "toby"
```

After:

```ruby
@@name += "toby"
```