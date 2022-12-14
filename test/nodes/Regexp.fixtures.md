<!-- BEGIN_AUTOGENERATED -->

# Regexp Node Formatting

Represents regex literal (e.g. `/foo/`)

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
/[a-z]+/
```

After:

```ruby
/[a-z]+/
```

## Retains wrapper tokens

Before:

```ruby
%r{\A(\\|/|!|\.|\?|\-|\*|\(|\)|,|;|:|@|%|&|\{|\}|\[|\]|"|\u2020|\u2021|\u00A1|\u00BF|\u2031)+}
```

After:

```ruby
%r{\A(\\|/|!|\.|\?|\-|\*|\(|\)|,|;|:|@|%|&|\{|\}|\[|\]|"|\u2020|\u2021|\u00A1|\u00BF|\u2031)+}
```

## Retains whitespace and comments

Before:

```ruby
regexp = %r{
  start         # some text
  \s            # white space char
  (group)       # first group
  (?:alt1|alt2) # some alternation
  end
}x
```

After:

```ruby
regexp = %r{
  start         # some text
  \s            # white space char
  (group)       # first group
  (?:alt1|alt2) # some alternation
  end
}x
```
