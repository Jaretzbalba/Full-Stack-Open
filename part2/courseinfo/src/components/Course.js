const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ name, exercises, id }) => (
  <p key={id}>
    {name} {exercises}
  </p>
);

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map(part => {
        return (
          <Part
            name={part.name}
            exercises={part.exercises}
            key={part.id}
          />
        );
      })}
    </>
  );
};

const Total = ({ course }) => {
  return <b>total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>;
};

const Course = ({ course }) => {
  console.log(course);
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

export default Course;
