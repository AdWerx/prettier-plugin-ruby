<!-- BEGIN_AUTOGENERATED -->
# Class Node Formatting

Represents a class definition (using a `class` keyword, `Class.new` is just a method call)
<!-- END_AUTOGENERATED -->

## Works

Before:

```ruby
class Foo
end
```

After:

```ruby
class Foo; end
```

## Breaks when the class has a body

Before:

```ruby
class Foo; def foo; end; end
```

After:

```ruby
class Foo
  def foo; end
end
```