<!-- BEGIN_AUTOGENERATED -->

# Module Node Formatting

Represents module declaration using `module` keyword

<!-- END_AUTOGENERATED -->

## Formats

Before:

```ruby
module Helper
  class Text
  end
end
```

After:

```ruby
module Helper
  class Text; end
end
```

## Formats with a body

Before:

```ruby
module Helper
  module_function

  def print
    ""
  end
end
```

After:

```ruby
module Helper
  module_function

  def print
    ""
  end
end
```
