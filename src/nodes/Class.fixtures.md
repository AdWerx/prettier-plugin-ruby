# Class Formatting

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
