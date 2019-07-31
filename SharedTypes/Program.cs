using NJsonSchema;
using NJsonSchema.CodeGeneration.CSharp;
using NJsonSchema.CodeGeneration.TypeScript;
using SharedTypes.Types;
using System.IO;

namespace SharedTypes
{
	class Program
	{
		private const string _clientOutputDirectory = @"..\..\..\Client\app\apitypes\ts\";
		private const string _serverOutputDirectory = @"..\..\..\SharedTypes.NET\CS\";
		private const string _schemaOutputDirectory = @"..\..\Schema\";

		private const string _schemaFileFormat = "{0}.json";
		private const string _csFileFormat = "{0}.cs";
		private const string _tsFileFormat = "{0}.ts";

		private static readonly CSharpGeneratorSettings _csharpGenerationSettings = new CSharpGeneratorSettings { GenerateJsonMethods = true, Namespace = "SharedTypes.NET" };
		private static readonly TypeScriptGeneratorSettings _tscriptGenerationSettings = new TypeScriptGeneratorSettings { TypeScriptVersion = 3.45M, HandleReferences = true };

		private static void Main(string[] args)
		{
			GenerateFromType<ContactSearch>();
			GenerateFromType<GetContactsResponse>();
		}

		private static void GenerateFromType<T>()
		{
			var schema = JsonSchema.FromType<T>();
			var schemaData = schema.ToJson();

			var csDefinitions = new CSharpGenerator(schema, _csharpGenerationSettings).GenerateFile();
			var tsDefinitions = new TypeScriptGenerator(schema, _tscriptGenerationSettings).GenerateFile();

			var schemaOutput = VerifyOutputFolder(_schemaOutputDirectory);
			var tsOutput = VerifyOutputFolder(_clientOutputDirectory);
			var csOutput = VerifyOutputFolder(_serverOutputDirectory);
			var fullTypeName = typeof(T).FullName;

			File.WriteAllText($@"{schemaOutput}{string.Format(_schemaFileFormat, fullTypeName)}", schemaData);
			File.WriteAllText($@"{tsOutput}{string.Format(_tsFileFormat, fullTypeName)}", tsDefinitions);
			File.WriteAllText($@"{csOutput}{string.Format(_csFileFormat, fullTypeName)}", csDefinitions);
		}

		private static string VerifyOutputFolder(string path)
		{
			if (!Directory.Exists(path))
				Directory.CreateDirectory(path);
			return path;
		}
	}
}
