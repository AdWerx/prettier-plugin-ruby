# Def Formatting

## Onelines a method without a body

Before:

```ruby
def foo
end
```

After:

```ruby
def foo; end
```

## Onelines a method with args without a body

Before:

```ruby
def foo(arg)
end
```

After:

```ruby
def foo(arg); end
```

## Breaks a method that has a body

Before:

```ruby
def foo; "foo"; end
```

After:

```ruby
def foo
  "foo"
end
```

## Formats an endless method definition

Before:

```ruby
def m() = 42
```

After:

```ruby
def m() = 42
```
